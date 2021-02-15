import { connect } from "react-redux";
import { setMainState } from "../../store/actions";
import { SignIn } from "./SignIn";

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
  setMainState: (type, payload) => dispatch(setMainState(type, payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)