import { connect } from 'react-redux';
import Thing2 from './Thing2.cmp';

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Thing2);
