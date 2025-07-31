export async function getTasks() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`);
    if (!res.ok) {
        throw new Error('Failed to fetch tasks');
    }
    return res.json();
}

export async function createTask(task: { name: string; description: string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    if (!res.ok) {
        throw new Error('Failed to create task');
    }
    return res.json();
} 