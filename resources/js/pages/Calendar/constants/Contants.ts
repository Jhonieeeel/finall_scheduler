const red = {
    lightColors: {
        main: '#ef4444',
        container: '#fee2e2',
        onContainer: '#991b1b',
    },
    darkColors: {
        main: '#f87171',
        container: '#7f1d1d',
        onContainer: '#fecaca',
    },
};

const green = {
    lightColors: {
        main: '#16A34A',
        container: '#DCFCE7',
        onContainer: '#14532D',
    },
    darkColors: {
        main: '#22C55E',
        container: '#14532D',
        onContainer: '#BBF7D0',
    },
};

const orange = {
    lightColors: {
        main: '#EA580C',
        container: '#FFEDD5',
        onContainer: '#9A3412',
    },
    darkColors: {
        main: '#F97316',
        container: '#9A3412',
        onContainer: '#FED7AA',
    },
};

export const calendarConfig = {
    'force leave': {
        colorName: 'force_leave',
        lightColors: {
            main: '#ef4444',
            container: '#fee2e2',
            onContainer: '#991b1b',
        },
        darkColors: {
            main: '#f87171',
            container: '#7f1d1d',
            onContainer: '#fecaca',
        },
    },
    'sick leave': {
        colorName: 'sick_leave',
    },
    'wellness leave': {
        colorName: 'wellness leave',
        lightColors: {
            main: '#ef4444',
            container: '#fee2e2',
            onContainer: '#991b1b',
        },
        darkColors: {
            main: '#f87171',
            container: '#7f1d1d',
            onContainer: '#fecaca',
        },
    },
    'special leave': {
        colorName: 'special_leave',
        lightColors: {
            main: '#ef4444',
            container: '#fee2e2',
            onContainer: '#991b1b',
        },
        darkColors: {
            main: '#f87171',
            container: '#7f1d1d',
            onContainer: '#fecaca',
        },
    },
    cto: {
        colorName: 'cto',
        ...green,
    },
    absent: {
        colorName: 'absent',
        ...orange,
    },
};
