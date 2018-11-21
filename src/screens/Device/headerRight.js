import React from 'react';
import { connect } from 'react-redux';
import { changeState } from "../../store/actions/device/devices";
import { ToggleSwitch } from '../../components';
import MessageHandler from '../../utils/messageHandler';
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
      this.props.changeState(id);
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
  changeState: id => {
    dispatch(changeState(id))
  },
})

const mapStateToProps = ({ auth: { user } }) => ({
  token: user.token
});

export default connect(mapStateToProps,mapDispatchToProps)(HeaderRight);