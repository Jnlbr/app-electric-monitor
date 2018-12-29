import React from 'react';
import { connect } from 'react-redux';
import { ToggleSwitch } from '../../components';
import MessageHandler from '../../utils/messageHandler';
import { stateChange } from "../../store/actions/device/getAll";
import updateStatus from "../../api/device/updateStatus";

class HeaderRight extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      device: this.props.device
    }
    this.messageHandler = new MessageHandler();
  }
  
  handleSwitch = async({id, status}) => {
    try {
      await updateStatus({id,status:!status}, this.props.token);
      this.props.stateChange(id);
      this.setState({
        device: {
          status: !status
        }
      })
    } catch(err) {
      this.messageHandler.errorMessage(err);
    }
  }

  render() {
    const device = this.state.device;
    
    return (
      <ToggleSwitch
        isOn={device.status}
        onColor="green"
        offColor="red"
        size="small"
        onToggle={(isOn) => {
          this.handleSwitch(device);
        }}
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  stateChange: id => dispatch(stateChange(id)),
})

const mapStateToProps = ({ auth: { logIn } }) => ({
  token: logIn.token
});

export default connect(mapStateToProps,mapDispatchToProps)(HeaderRight);