export interface FeedbackFormValues {
    name: string;
    phone: string;
    message: string;
    notRobot: boolean;
}

export interface FeedbackFormProps {
    setVisible: (v: boolean) => void;
}
