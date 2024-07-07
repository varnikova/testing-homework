import React, { useCallback, useState } from 'react';
import { cn } from '@bem-react/classname';
var PHONE_REGEX = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
function getControlClass(isValid, submitted) {
    return !isValid && submitted ? 'form-control is-invalid' : 'form-control';
}
var bem = cn('Form');
export var Form = function (_a) {
    var onSubmit = _a.onSubmit;
    var _b = useState(false), sent = _b[0], setSent = _b[1];
    var _c = useState(false), submitted = _c[0], setSubmitted = _c[1];
    var _d = useState(''), name = _d[0], setName = _d[1];
    var _e = useState(''), phone = _e[0], setPhone = _e[1];
    var _f = useState(''), address = _f[0], setAddress = _f[1];
    var nameIsValid = Boolean(name.trim());
    var phoneIsValid = process.env.BUG_ID !== '10' ? PHONE_REGEX.test(phone.trim()) : false;
    var addressIsValid = Boolean(address.trim());
    var onChangeName = useCallback(function (e) {
        setName(e.target.value);
    }, [setName]);
    var onChangePhone = useCallback(function (e) {
        setPhone(e.target.value);
    }, [setPhone]);
    var onChangeAddress = useCallback(function (e) {
        setAddress(e.target.value);
    }, [setAddress]);
    var onClick = useCallback(function () {
        setSubmitted(true);
        if (nameIsValid && phoneIsValid && addressIsValid) {
            setSent(true);
            onSubmit({
                name: name.trim(),
                phone: phone.trim(),
                address: address.trim(),
            });
        }
    }, [nameIsValid, phoneIsValid, addressIsValid, setSubmitted, setSent, onSubmit]);
    return (React.createElement("div", { className: bem() },
        React.createElement("div", { className: "mb-3" },
            React.createElement("label", { htmlFor: "f-name", className: "form-label" }, "Name"),
            React.createElement("input", { id: "f-name", type: "text", disabled: sent, className: bem("Field", { type: 'name' }, [getControlClass(nameIsValid, submitted)]), autoComplete: "off", onChange: onChangeName }),
            React.createElement("div", { className: "invalid-feedback" }, "Please provide your name")),
        React.createElement("div", { className: "mb-3" },
            React.createElement("label", { htmlFor: "f-phone", className: "form-label" }, "Phone"),
            React.createElement("input", { id: "f-phone", type: "text", disabled: sent, className: bem("Field", { type: 'phone' }, [getControlClass(phoneIsValid, submitted)]), onChange: onChangePhone }),
            React.createElement("div", { className: "invalid-feedback" }, "Please provide a valid phone")),
        React.createElement("div", { className: "mb-3" },
            React.createElement("label", { htmlFor: "f-address", className: "form-label" }, "Address"),
            React.createElement("textarea", { id: "f-address", disabled: sent, rows: 3, className: bem("Field", { type: 'address' }, [getControlClass(addressIsValid, submitted)]), onChange: onChangeAddress }),
            React.createElement("div", { className: "invalid-feedback" }, "Please provide a valid address")),
        React.createElement("button", { className: bem('Submit', ['btn', 'btn-primary']), disabled: sent, onClick: onClick }, "Checkout")));
};
