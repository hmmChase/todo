import DisplayError from '../DisplayError/DisplayError';
import DeleteIcon from '../DeleteIcon/DeleteIcon';

export default () => (
  <>
    <DisplayError error={{ message: 'this is a test' }}></DisplayError>
    <DeleteIcon></DeleteIcon>
  </>
);
