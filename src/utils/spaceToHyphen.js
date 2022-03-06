export default function spaceToHyphen(withSpace) {
  return withSpace.toLocaleLowerCase().replaceAll(' ', '-');
}
