# 💰 Expense Tracker

A modern, responsive web application to track your daily expenses with categorization and analytics.

## Features

✨ **Key Features:**
- ✅ Add expenses with date, amount, category, and description
- 📊 View total expenses and category breakdown
- 🔍 Filter expenses by category
- 📈 Sort expenses by date or amount
- 🏷️ 8 predefined expense categories with emojis
- 💾 Local storage persistence (data saves automatically)
- 📱 Fully responsive design (desktop, tablet, mobile)
- 🎨 Modern UI with smooth animations
- 🗑️ Delete individual expenses or clear all
- 📋 Beautiful expense list with table view

## Categories

The app includes the following expense categories:
- 🍔 Food
- 🚗 Transport
- 🎬 Entertainment
- 💡 Utilities
- 🏥 Healthcare
- 🛍️ Shopping
- 📚 Education
- 📌 Other

## How to Use

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

2. Open `index.html` in your web browser

That's it! No installation or build process needed. The app runs entirely in the browser.

### Adding an Expense

1. Fill in the expense form:
   - **Date**: Select the date of the expense
   - **Amount**: Enter the expense amount in dollars
   - **Category**: Choose a category from the dropdown
   - **Description**: Add an optional description

2. Click "Add Expense" button

3. The expense will be added to your list and data will be saved automatically

### Viewing Expenses

- **Total Expenses**: View the sum of all expenses at the top
- **Category Count**: See how many different categories you have
- **Transaction Count**: Check the total number of transactions

### Filtering & Sorting

- **Filter by Category**: Select a category to view only those expenses
- **Sort Options**:
  - Latest First (default)
  - Oldest First
  - Highest Amount
  - Lowest Amount

### Category Breakdown

A summary showing the total amount spent in each category is displayed above the expense table for quick insights.

## Data Storage

All data is stored in your browser's **local storage**, which means:
- ✅ Your data persists even after closing the browser
- ✅ Your data is stored locally (not on any server)
- ✅ No account login required
- ⚠️ Clearing browser data will delete all expenses

## Browser Compatibility

Works on all modern browsers:
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## Project Structure

```
expense-tracker/
├── index.html      # Main HTML structure
├── styles.css      # Styling and responsive design
├── app.js          # JavaScript functionality
├── README.md       # Documentation
└── .gitignore      # Git ignore file
```

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Grid, Flexbox, and animations
- **JavaScript (Vanilla)**: Pure JavaScript, no frameworks or dependencies
- **Local Storage API**: For data persistence

## Features Breakdown

### 1. Expense Management
- Add new expenses with validation
- Delete individual expenses with confirmation
- Clear all expenses with safety confirmation

### 2. Analytics
- Real-time total calculation
- Category-wise spending breakdown
- Transaction count tracking

### 3. Filtering & Sorting
- Filter by category
- Sort by date (ascending/descending)
- Sort by amount (ascending/descending)

### 4. User Experience
- Smooth animations and transitions
- Notification system for user feedback
- Empty state messaging
- Responsive design for all screen sizes
- Color-coded category badges

## Future Enhancements

Possible features for future versions:
- 💾 Export data as CSV/PDF
- 📅 Monthly/yearly reports
- 📊 Data visualization (charts/graphs)
- 🎯 Budget setting and alerts
- 🌙 Dark mode toggle
- 🔐 Password protection
- ☁️ Cloud sync support
- 📱 Mobile app version

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Author

Created with ❤️ for expense tracking enthusiasts.

## Support

If you encounter any issues or have suggestions, please create an issue on GitHub.

---

**Happy Expense Tracking! 💸**
