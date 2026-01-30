import toast from 'react-hot-toast';
import { AlertToast } from '@/components/Toast';

export const showSuccessToast = (message) => {
  toast.custom(() => <AlertToast message={message} variant="success" />);
};

export const showWarningToast = (message) => {
  toast.custom(() => <AlertToast message={message} variant="warning" />);
};
