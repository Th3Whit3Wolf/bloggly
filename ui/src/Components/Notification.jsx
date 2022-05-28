import {
	Snackbar,
	Alert as MuiAlert,
	AlertTitle,
	Slide,
	useTheme
} from "@mui/material";
import { forwardRef, useState } from "react";
const severityOptions = {
	s: "success",
	suc: "success",
	success: "success",
	i: "info",
	info: "info",
	w: "warning",
	warn: "warning",
	warning: "warning",
	e: "error",
	err: "error",
	error: "error"
};

const verticalOptions = {
	t: "top",
	top: "top",
	b: "bottom",
	btm: "bottom",
	bottom: "bottom"
};

const horizontalOptions = {
	l: "left",
	left: "left",
	c: "center",
	ctr: "center",
	center: "center",
	r: "right",
	right: "right"
};

function SlideTransition(props) {
	return <Slide {...props} direction="up" />;
}

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = ({
	title,
	message,
	afterClose,
	show,
	severity = "info",
	vertical = "top",
	horizontal = "right"
}) => {
	const theme = useTheme();
	const [notificationState, setNotificationState] = useState({
		open: show !== undefined,
		severity:
			severityOptions[severity] !== undefined
				? severityOptions[severity]
				: "info",
		horizontal:
			horizontalOptions[horizontal] !== undefined
				? horizontalOptions[horizontal]
				: "right",
		vertical:
			verticalOptions[vertical] !== undefined
				? verticalOptions[vertical]
				: "top"
	});

	const handleClose = event => {
		setNotificationState({ ...notificationState, open: false });
		if (afterClose) {
			setTimeout(() => {
				afterClose();
			}, theme.transitions.duration.leavingScreen);
		}
	};

	const {
		open,
		severity: notifS,
		horizontal: notifH,
		vertical: notifV
	} = notificationState;

	return (
		<Snackbar
			open={open}
			onClose={handleClose}
			TransitionComponent={SlideTransition}
			anchorOrigin={{ vertical: notifV, horizontal: notifH }}
			sx={{ mt: notifV === "top" ? "100px" : "0px" }}
		>
			<Alert
				elevation={6}
				variant="filled"
				onClose={handleClose}
				severity={notifS}
			>
				{title && <AlertTitle>{title}</AlertTitle>}
				{message}
			</Alert>
		</Snackbar>
	);
};

export default Notification;
