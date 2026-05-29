let orders = [];

// Update current time
function updateTime() {
    const now = new Date();
    document.getElementById('current-time').textContent = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

// Sample orders (for demo)
function loadSampleOrders() {
    orders = [
        {
            id: "ORD-101",
            table: 7,
            items: ["Grilled Salmon (GF)", "Caesar Salad"],
            prepTime: 18,
            status: "pending",
            dietary: "Gluten Free"
        },
        {
            id: "ORD-102",
            table: 3,
            items: ["Ribeye Steak", "Mashed Potato"],
            prepTime: 25,
            status: "in_progress",
            dietary: ""
        },
        {
            id: "ORD-103",
            table: 12,
            items: ["Vegan Burger", "Sweet Potato Fries"],
            prepTime: 12,
            status: "pending",
            dietary: "Vegan"
        }
    ];
    renderOrders();
}

function getPriorityClass(prepTime) {
    if (prepTime <= 15) return "high";
    if (prepTime <= 25) return "medium";
    return "low";
}

function renderOrders(filteredOrders = orders) {
    const grid = document.getElementById('orders-grid');
    grid.innerHTML = '';

    filteredOrders.forEach(order => {
        const card = document.createElement('div');
        card.className = `order-card ${getPriorityClass(order.prepTime)}`;
        
        card.innerHTML = `
            <h3>Order #${order.id}</h3>
            <p class="table">Table ${order.table}</p>
            <p><strong>Prep Time:</strong> ${order.prepTime} mins</p>
            
            <div class="items">
                ${order.items.map(item => `<div>• ${item}</div>`).join('')}
            </div>
            
            ${order.dietary ? `<span class="dietary">${order.dietary}</span>` : ''}
            
            <div style="margin-top: 15px;">
                <button class="status-btn start-btn" onclick="updateStatus('${order.id}', 'in_progress')">Start Prep</button>
                <button class="status-btn ready-btn" onclick="updateStatus('${order.id}', 'ready')">Mark Ready</button>
            </div>
        `;
        grid.appendChild(card);
    });

    document.getElementById('total-orders').textContent = filteredOrders.length;
}

// Update order status
window.updateStatus = function(orderId, newStatus) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        renderOrders();
        
        // Simulate sending to backend
        console.log(`Order ${orderId} status updated to: ${newStatus}`);
        alert(`Order ${orderId} is now ${newStatus.replace('_', ' ')}!`);
    }
};

// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        
        if (filter === 'all') {
            renderOrders(orders);
        } else {
            const filtered = orders.filter(order => order.status === filter);
            renderOrders(filtered);
        }
    });
});

// Initialize
loadSampleOrders();