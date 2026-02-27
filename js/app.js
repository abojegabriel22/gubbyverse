// Track task completion
const tasks = {
    1: false,
    2: false,
    3: false,
    4: false
};

const completeBtn = document.getElementById('completeBtn');

function checkAllTasks() {
    const allDone = Object.values(tasks).every(v => v === true);
    completeBtn.disabled = !allDone;
}

// Handle task links (tasks 1 & 2)
document.querySelectorAll('.task-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const taskId = e.target.dataset.task;

        // Mark as "Checking..." temporarily
        e.target.textContent = 'Checking...';
        e.target.classList.add('disabled');

        // Simulate user verification after 5 seconds
        setTimeout(() => {
            const verified = confirm(`Did you complete Task ${taskId}? Click OK if done.`);

            if (verified) {
                tasks[taskId] = true;
                e.target.textContent = 'Completed';
                e.target.classList.remove('btn-primary');
                e.target.classList.add('btn-success');
            } else {
                tasks[taskId] = false;
                e.target.textContent = 'GO →';
                e.target.classList.remove('disabled');
            }

            checkAllTasks();
        }, 5000); // 5 seconds wait
    });
});

// Handle task button (task 3)
document.querySelectorAll('.go-button').forEach(button => {
    const taskId = button.dataset.task;
    if (!taskId || taskId === "1" || taskId === "2") return; // Skip links already handled

    button.addEventListener('click', (e) => {
        e.target.textContent = 'Checking...';
        e.target.disabled = true;

        setTimeout(() => {
            const verified = confirm(`Did you complete Task ${taskId}? Click OK if done.`);

            if (verified) {
                tasks[taskId] = true;
                e.target.textContent = 'Completed';
                e.target.classList.remove('btn-primary');
                e.target.classList.add('btn-success');
            } else {
                tasks[taskId] = false;
                e.target.textContent = 'GO →';
                e.target.disabled = false;
            }

            checkAllTasks();
        }, 5000);
    });
});

// Handle radio button (task 4)
document.querySelectorAll('input[name="gubbler"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        tasks[4] = e.target.id === 'yes'; // mark true only if yes
        checkAllTasks();
    });
});