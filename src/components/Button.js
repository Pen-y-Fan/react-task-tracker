import PropTypes from "prop-types";

const Button = ({colour, text, onClick}) => {

  return (<button
    onClick={onClick}
    style={{backgroundColor: colour }}
    className='btn'>{text}
  </button>
  )
}

Button.defaultProps = {
  colour: 'green',
};

Button.propTypes = {
  colour: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
}
export default Button;

