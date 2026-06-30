// Expense Tracker App
class ExpenseTracker {
    constructor() {
        this.expenses = this.loadFromLocalStorage();
        this.init();
    }

    init() {
        // Set today's date as default
        document.getElementById('date').valueAsDate = new Date();

        // Event listeners
        document.getElementById('expenseForm').addEventListener('submit', (e) => this.addExpense(e));
        document.getElementById('filterCategory').addEventListener('change', () => this.render());
        document.getElementById('sortBy').addEventListener('change', () => this.render());
        document.getElementById('clearAll').addEventListener('click', () => this.clearAllExpenses());

        // Initial render
        this.render();
    }

    addExpense(e) {
        e.preventDefault();

        const expense = {
            id: Date.now(),
            date: document.getElementById('date').value,
            amount: parseFloat(document.getElementById('amount').value),
            category: document.getElementById('category').value,
            description: document.getElementById('description').value,
        };

        this.expenses.push(expense);
        this.saveToLocalStorage();
        this.render();

        // Reset form
        document.getElementById('expenseForm').reset();
        document.getElementById('date').valueAsDate = new Date();

        // Show success message
        this.showNotification('Expense added successfully!', 'success');
    }

    deleteExpense(id) {
        if (confirm('Are you sure you want to delete this expense?')) {
            this.expenses = this.expenses.filter(exp => exp.id !== id);
            this.saveToLocalStorage();
            this.render();
            this.showNotification('Expense deleted!', 'success');
        }
    }

    clearAllExpenses() {
        if (this.expenses.length === 0) {
            alert('No expenses to clear!');
            return;
        }

        if (confirm('Are you sure you want to delete all expenses? This cannot be undone.')) {
            this.expenses = [];
            this.saveToLocalStorage();
            this.render();
            this.showNotification('All expenses cleared!', 'success');
        }
    }

    getFilteredExpenses() {
        let filtered = [...this.expenses];

        // Filter by category
        const selectedCategory = document.getElementById('filterCategory').value;
        if (selectedCategory) {
            filtered = filtered.filter(exp => exp.category === selectedCategory);
        }

        // Sort
        const sortBy = document.getElementById('sortBy').value;
        filtered.sort((a, b) => {
            if (sortBy === 'date-desc') {
                return new Date(b.date) - new Date(a.date);
            } else if (sortBy === 'date-asc') {
                return new Date(a.date) - new Date(b.date);
            } else if (sortBy === 'amount-desc') {
                return b.amount - a.amount;
            } else if (sortBy === 'amount-asc') {
                return a.amount - b.amount;
            }
        });

        return filtered;
    }

    calculateStats() {
        const total = this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
        const categories = new Set(this.expenses.map(exp => exp.category)).size;
        const count = this.expenses.length;

        return { total, categories, count };
    }

    getCategorySummary() {
        const summary = {};

        this.expenses.forEach(exp => {
            if (!summary[exp.category]) {
                summary[exp.category] = 0;
            }
            summary[exp.category] += exp.amount;
        });

        return summary;
    }

    formatDate(dateString) {
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    }

    getCategoryEmoji(category) {
        const emojis = {
            Food: '🍔',
            Transport: '🚗',
            Entertainment: '🎬',
            Utilities: '💡',
            Healthcare: '🏥',
            Shopping: '🛍️',
            Education: '📚',
            Other: '📌',
        };
        return emojis[category] || '📌';
    }

    render() {
        this.updateStats();
        this.renderCategorySummary();
        this.renderExpenses();
    }

    updateStats() {
        const stats = this.calculateStats();

        document.getElementById('totalExpenses').textContent = this.formatCurrency(stats.total);
        document.getElementById('categoryCount').textContent = stats.categories;
        document.getElementById('transactionCount').textContent = stats.count;
    }

    renderCategorySummary() {
        const summary = this.getCategorySummary();
        const summaryContainer = document.getElementById('categorySummary');

        if (Object.keys(summary).length === 0) {
            summaryContainer.innerHTML = '';
            return;
        }

        let html = '<h3>Category Breakdown</h3><div class="category-list">';

        Object.entries(summary)
            .sort((a, b) => b[1] - a[1])
            .forEach(([category, amount]) => {
                const emoji = this.getCategoryEmoji(category);
                html += `
                    <div class="category-item">
                        <strong>${emoji} ${category}</strong>
                        <span>${this.formatCurrency(amount)}</span>
                    </div>
                `;
            });

        html += '</div>';
        summaryContainer.innerHTML = html;
    }

    renderExpenses() {
        const filtered = this.getFilteredExpenses();
        const container = document.getElementById('expensesContainer');

        if (filtered.length === 0) {
            container.innerHTML = '<p class="empty-message">No expenses to display.</p>';
            return;
        }

        let html = `
            <table class="expenses-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
        `;

        filtered.forEach(expense => {
            const emoji = this.getCategoryEmoji(expense.category);
            html += `
                <tr>
                    <td>${this.formatDate(expense.date)}</td>
                    <td>${this.escapeHtml(expense.description || '-')}</td>
                    <td><span class="category-badge ${expense.category}">${emoji} ${expense.category}</span></td>
                    <td class="amount-cell">${this.formatCurrency(expense.amount)}</td>
                    <td class="action-cell">
                        <button class="btn btn-danger" onclick="expenseTracker.deleteExpense(${expense.id})">Delete</button>
                    </td>
                </tr>
            `;
        });

        html += '</tbody></table>';
        container.innerHTML = html;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    saveToLocalStorage() {
        localStorage.setItem('expenses', JSON.stringify(this.expenses));
    }

    loadFromLocalStorage() {
        const data = localStorage.getItem('expenses');
        return data ? JSON.parse(data) : [];
    }
}

// Add animation styles for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// Initialize the app
const expenseTracker = new ExpenseTracker();
