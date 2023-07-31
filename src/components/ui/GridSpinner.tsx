import dynamic from 'next/dynamic';

const GridLoader = dynamic(
  () => import('react-spinners').then((lib) => lib.GridLoader),
  {
    ssr: false,
  }
);
// GridLoader를 다이나믹하게 import하기 위해 설정. ssr: false 로 설정하여 서버에서 미리 랜더링 하지않게 하기 위함
type Props = {
  color?: string;
};
export default function GridSpinner({ color = 'red' }: Props) {
  return <GridLoader color={color} />;
}
