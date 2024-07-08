import { Grid, Skeleton, Stack } from "@mui/material";

const Loader = () => (
	<Grid container height={"calc(100vh - 4rem)"} spacing={"1rem"}>
		<Grid item xs={12} sm={7} height={"100%"}>
			<Stack spacing={1}>
				{Array.from({ length: 10 }).map((_, i) => (
					<Skeleton key={i} variant="rounded" height={"5rem"} />
				))}
			</Stack>
		</Grid>

		<Grid
			item
			sm={5}
			sx={{
				display: { xs: "none", sm: "block" },
			}}
			height={"100%"}
		>
			<Skeleton variant="rectangular" height={"100vh"} />
		</Grid>
	</Grid>
);

export default Loader;
