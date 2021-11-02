import toast from 'react-hot-toast';

const errorToast = () =>
  toast('Something went wrong!', {
    duration: 3000,
    position: 'bottom-center',
    // Styling
    style: {
      background: '#DEFB48',
    },
    className: 'font-inter font-bold',
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  });

export default errorToast;
