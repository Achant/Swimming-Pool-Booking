const bookings = [];

document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const fromDate = new Date(document.getElementById('fromDate').value);
    const toDate = new Date(document.getElementById('toDate').value);
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value;
    const supervisor = document.getElementById('supervisor').value;

    const timeDifference = (toDate - fromDate) / (1000 * 60 * 60); // Difference in hours

    if (timeDifference > 2) {
        alert('Booking time cannot exceed 2 hours.');
        return;
    }

    if (children > 0 && !supervisor) {
        alert('Please provide a supervisor\'s name for the children.');
        return;
    }

    for (const booking of bookings) {
        if ((fromDate >= booking.fromDate && fromDate < booking.toDate) ||
            (toDate > booking.fromDate && toDate <= booking.toDate) ||
            (fromDate <= booking.fromDate && toDate >= booking.toDate)) {
            alert('This time slot is already booked. Please choose another date or time.');
            return;
        }
    }

    const newBooking = {
        name,
        fromDate,
        toDate,
        adults,
        children,
        supervisor
    };

    bookings.push(newBooking);
    displayBookings();

    const confirmationMessage = `
        Booking Details:
        - Booker's Name: ${name}
        - From: ${fromDate.toLocaleString()}
        - To: ${toDate.toLocaleString()}
        - Number of Adults: ${adults}
        - Number of Children: ${children}
        ${children > 0 ? `- Supervisor's Name: ${supervisor}` : ''}
    `;

    document.getElementById('confirmationMessage').innerText = confirmationMessage;
    document.getElementById('confirmation').style.display = 'block';
});

document.getElementById('children').addEventListener('input', function() {
    const children = document.getElementById('children').value;
    const supervisorSection = document.getElementById('supervisorSection');
    if (children > 0) {
        supervisorSection.style.display = 'block';
    } else {
        supervisorSection.style.display = 'none';
    }
});

function displayBookings() {
    const bookingList = document.getElementById('bookingList');
    bookingList.innerHTML = '';

    for (const booking of bookings) {
        const listItem = document.createElement('li');
        listItem.innerText = `
            ${booking.name} - From: ${booking.fromDate.toLocaleString()} To: ${booking.toDate.toLocaleString()}
        `;
        bookingList.appendChild(listItem);
    }
}
