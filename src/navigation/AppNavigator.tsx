import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, CalendarDays, Bell, User } from 'lucide-react-native';
import { Colors } from '../theme/colors';

// Auth Screens
import { SplashScreen } from '../screens/auth/SplashScreen';
import { OnboardingScreen } from '../screens/auth/OnboardingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { SignUpScreen } from '../screens/auth/SignUpScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';

// Patient Screens
import { HomeScreen } from '../screens/patient/HomeScreen';
import { DoctorListScreen } from '../screens/patient/DoctorListScreen';
import { DoctorProfileScreen } from '../screens/patient/DoctorProfileScreen';
import { BookAppointmentScreen } from '../screens/patient/BookAppointmentScreen';
import { ConfirmAppointmentScreen } from '../screens/patient/ConfirmAppointmentScreen';
import { PaymentScreen } from '../screens/patient/PaymentScreen';
import { BookingSuccessScreen } from '../screens/patient/BookingSuccessScreen';
import { AppointmentsScreen } from '../screens/patient/AppointmentsScreen';
import { AppointmentDetailScreen } from '../screens/patient/AppointmentDetailScreen';
import { ChatScreen } from '../screens/patient/ChatScreen';
import { NotificationsScreen } from '../screens/patient/NotificationsScreen';
import { ProfileScreen } from '../screens/patient/ProfileScreen';
import { EditProfileScreen } from '../screens/patient/EditProfileScreen';
import { SettingsScreen } from '../screens/patient/SettingsScreen';

// Doctor Screens
import { DoctorDashboard } from '../screens/doctor/DoctorDashboard';
import { ManageAvailability } from '../screens/doctor/ManageAvailability';
import { AppointmentRequests } from '../screens/doctor/AppointmentRequests';
import { PatientDetails } from '../screens/doctor/PatientDetails';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function PatientTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: Colors.white,
                    borderTopWidth: 1,
                    borderTopColor: Colors.gray100,
                    paddingBottom: 8,
                    paddingTop: 8,
                    height: 65,
                },
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.gray400,
                tabBarLabelStyle: { fontSize: 10, marginTop: 2 },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Home size={22} color={color} />,
                }}
            />
            <Tab.Screen
                name="Appointments"
                component={AppointmentsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <CalendarDays size={22} color={color} />,
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Bell size={22} color={color} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <User size={22} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* Auth Flow */}
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

                {/* Patient Flow */}
                <Stack.Screen name="PatientTabs" component={PatientTabNavigator} />
                <Stack.Screen name="DoctorList" component={DoctorListScreen} />
                <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} />
                <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
                <Stack.Screen name="ConfirmAppointment" component={ConfirmAppointmentScreen} />
                <Stack.Screen name="Payment" component={PaymentScreen} />
                <Stack.Screen name="BookingSuccess" component={BookingSuccessScreen} />
                <Stack.Screen name="AppointmentDetail" component={AppointmentDetailScreen} />
                <Stack.Screen name="Chat" component={ChatScreen} />
                <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />

                {/* Doctor Flow */}
                <Stack.Screen name="DoctorStack" component={DoctorDashboard} />
                <Stack.Screen name="ManageAvailability" component={ManageAvailability} />
                <Stack.Screen name="AppointmentRequests" component={AppointmentRequests} />
                <Stack.Screen name="PatientDetails" component={PatientDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
