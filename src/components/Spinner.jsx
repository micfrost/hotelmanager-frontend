import ClipLoader from 'react-spinners/ClipLoader';
import PropTypes from "prop-types";

// CSS styles to override default styles of the ClipLoader component
const override = {
  display: 'block',
  margin: '100px auto',
};

// Define a functional component that returns a spinner component with a loading prop to show or hide the spinner
const Spinner = ({ loading }) => {

  // Render the ClipLoader component with custom styles
  return (
    <ClipLoader
      color='#4338ca'
      loading={loading}
      cssOverride={override}
      size={150}
    />
  );
};

PropTypes.Spinner = {
  loading: PropTypes.bool,
};
export default Spinner;
