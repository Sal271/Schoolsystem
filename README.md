# School System

A comprehensive mobile application built with React Native and Expo for managing school activities, attendance, homework, quizzes, and results for students, teachers, and guests.

## Features

### For Students
- View attendance records
- Access homework assignments
- Take quizzes
- View results and grades
- Access solutions to assignments

### For Teachers ( username teacher , pw : 123 )
- Add new student/teacher accounts
- Add and manage marks
- Manage attendance records
- Create and assign homework
- Create and manage quizzes
- View student results
- Provide solutions to assignments

### For Guests
- View attendance information
- Access homework details
- View quiz information
- Access results
- View solutions

## Technologies Used

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform for React Native
- **Expo Router** - File-based routing for Expo
- **AsyncStorage** - Local data storage
- **React Navigation** - Navigation between screens

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (version 18 or higher)
- npm or yarn
- Expo CLI
- A mobile device or emulator

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/school-system.git
cd school-system
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Run on your device:
   - For Android: `npm run android`
   - For iOS: `npm run ios`
   - For Web: `npm run web`

## Project Structure

```
school-system/
├── app/                    # Main application screens
│   ├── _layout.js         # Root layout component
│   ├── index.js           # Home screen
│   ├── home.js            # Main home screen with role selection
│   ├── LoginPage.js       # Authentication screen
│   ├── Guest/             # Guest-related screens
│   ├── Student/           # Student dashboard and features
│   └── Teacher/           # Teacher dashboard and features
├── assets/                # Images, icons, and other assets
├── components/            # Reusable UI components
│   ├── action_button.js
│   ├── BigTitle.js
│   ├── button.js
│   ├── date.js
│   ├── header.js
│   ├── InputField.js
│   ├── PreviewBox.js
│   ├── QuizBox.js
│   ├── TernimalCard.js
│   ├── TitleCard.js
│   ├── uploadData.js
│   └── WelcomeCard.js
├── constants/             # App constants and configurations
│   └── colors.js
├── storage/               # Data storage utilities
│   ├── attendance.js
│   ├── homework.js
│   ├── keys.js
│   ├── marks.js
│   ├── quiz.js
│   ├── results.js
│   ├── students.js
│   ├── submission.js
│   └── users.js
├── app.json               # Expo configuration
├── package.json           # Project dependencies
└── README.md             # Project documentation
```

## Usage

1. **Launch the app** on your device or emulator
2. **Select your role**: Student, Teacher, or Guest
3. **Login** with your credentials (for Student/Teacher roles)
4. **Access features** based on your role permissions

### Student Workflow
1. Login with student credentials
2. View dashboard with available options
3. Check attendance, homework, take quizzes, view results

### Teacher Workflow
1. Login with teacher credentials
2. Access teacher dashboard
3. Manage students, create assignments, grade work

### Guest Access
1. Select Guest option
2. View limited information without login

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

## Acknowledgments

- Built with Expo and React Native
- Icons and assets provided by the development team
- Special thanks to the open-source community
## Video
<!-- Failed to upload "IMG_1239.MP4" -->
<!-- Failed to upload "IMG_1238.MP4" -->
