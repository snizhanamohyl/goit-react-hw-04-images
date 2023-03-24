import { Grid } from 'react-loader-spinner';

export default function Loader() {
  return <Grid
  height="80"
  width="80"
  color="#3f51b5"
  ariaLabel="grid-loading"
  radius="12.5"
  wrapperStyle={{ justifyContent: "center"}}
  visible={true}    
  />
} 