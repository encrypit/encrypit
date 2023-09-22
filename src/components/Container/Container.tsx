import MaterialContainer, {
  type ContainerProps,
} from '@mui/material/Container';

interface Props extends Omit<ContainerProps, 'component'> {
  component?: string;
}

export default function Container(props: Props) {
  return <MaterialContainer maxWidth="md" {...props} />;
}
