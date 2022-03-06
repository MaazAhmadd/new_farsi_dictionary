export default function getcolorfromword(word) {
  word = word.split(' ').join('');
  let all = {
    a: 61,
    b: 36,
    c: 54,
    d: 44,
    e: 91,
    f: 23,
    g: 38,
    h: 61,
    i: 45,
    j: 49,
    k: 37,
    l: 78,
    m: 31,
    n: 23,
    o: 19,
    p: 73,
    q: 69,
    r: 87,
    s: 93,
    t: 47,
    u: 51,
    v: 39,
    w: 43,
    x: 9,
    y: 37,
    z: 53,
  };
  let ltr = word.split('');
  let factor = 0;
  ltr.forEach((l) => {
    factor += all[l] * 23;
  });

  let hsl = `hsl(${factor}, 56%, 94%)`;
  return hsl;
}
