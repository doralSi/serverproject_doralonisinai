import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormButton from "./FormButton";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import LoopIcon from "@mui/icons-material/Loop";
import { useMediaQuery, useTheme } from "@mui/material";

const Form = ({
	title = "",
	onSubmit,
	onReset,
	to = "/",
	color = "inherit",
	spacing = 2,
	styles = {},
	children,
	isFormValid = () => true,
}) => {
	const navigate = useNavigate();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const handleReset = (e) => {
		e.preventDefault();
		const form = e.target.closest("form");
		if (form) form.reset();
	};

		return (
			<Box
				component="form"
				color={color}
				sx={{
				p: { xs: 3, sm: 5 },
				width: "100%",
				boxSizing: "border-box",
				...styles,
				}}
				onSubmit={onSubmit}
				autoComplete="off"
				noValidate
			>


						{children}

										<Box sx={{ mt: 3 }}>
														<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
															<Box sx={{ width: { xs: '100%', md: 1050 }, maxWidth: '100%' }}>
																<FormButton
																	node="SUBMIT"
																	onClick={onSubmit}
																	size={isMobile ? "medium" : "large"}
																	fullWidth
																	disabled={!isFormValid()}
																	sx={{
																		fontSize: isMobile ? "0.9rem" : "1rem",
																		py: isMobile ? 1 : 1.5
																	}}
																/>
															</Box>
														</Box>
														<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 2 }}>
															<Box sx={{ width: { xs: '100%', md: 1050 }, maxWidth: '100%', display: 'flex', gap: 2 }}>
																<FormButton
																	node={<LoopIcon />}
																	variant="outlined"
																	size="small"
																	onClick={onReset || handleReset}
																	sx={{ minWidth: 100 }}
																/>
																<FormButton
																	node="CANCEL"
																	color="error"
																	variant="outlined"
																	size="small"
																	onClick={() => navigate(to)}
																	sx={{ minWidth: 100 }}
																/>
															</Box>
														</Box>
										</Box>
			</Box>
		);
};

export default Form;
