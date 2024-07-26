import { Grid, Skeleton, Stack } from "@mui/material";

const Loader = () => (
	<Grid container height={"100vh"} spacing={"1rem"}>
		<Grid item xs={12} height={"100%"}>
			<Stack spacing={1}>
				{Array.from({ length: 10 }).map((_, i) => (
					<Skeleton key={i} variant="rounded" height={"5rem"} />
				))}
			</Stack>
		</Grid>
	</Grid>
);

export default Loader;
