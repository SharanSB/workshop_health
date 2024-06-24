document.getElementById('createWorkshopForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;

    if (!title || !date || !description) {
        document.getElementById('message').textContent = "All fields are required.";
        return;
    }

    fetch('/api/create_workshop', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, date, description })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('message').textContent = "Workshop created successfully!";
            document.getElementById('createWorkshopForm').reset();
        } else {
            document.getElementById('message').textContent = "Failed to create workshop.";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').textContent = "An error occurred.";
    });
});

document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/get_workshops')
        .then(response => response.json())
        .then(data => {
            const workshopSelect = document.getElementById('workshop');
            data.workshops.forEach(workshop => {
                const option = document.createElement('option');
                option.value = workshop.id;
                option.textContent = `${workshop.title} - ${new Date(workshop.date).toLocaleString()}`;
                workshopSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('participateWorkshopForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const workshopId = document.getElementById('workshop').value;

    if (!name || !email || !workshopId) {
        document.getElementById('message').textContent = "All fields are required.";
        return;
    }

    fetch('/api/register_participant', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, workshopId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('message').textContent = "Registration successful!";
            // Load the video for the workshop
            loadVideo(workshopId);
        } else {
            document.getElementById('message').textContent = "Failed to register.";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').textContent = "An error occurred.";
    });
});

function loadVideo(workshopId) {
    // Example of integrating a video API (assuming we use a service like Zoom or Jitsi)
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = `<iframe src="https://example.com/video/${workshopId}" width="600" height="400"></iframe>`;
}
