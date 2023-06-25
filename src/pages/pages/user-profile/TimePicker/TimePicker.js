import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";

const DeliTimePicker = (props) => (
  <TimePicker
    {...props}
    className={props?.className}
    popupClassName={props?.className}
    showSecond={false}
    onChange={props?.onChange}
    hideDisabledOptions
    minuteStep={1}
    value={props?.value}
    use12Hours
    open={props?.open}
    format="hh:mm A"
    onClose={props?.onClose}
  />
);

DeliTimePicker.propTypes = {
  className: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(moment)
};

export default DeliTimePicker;
