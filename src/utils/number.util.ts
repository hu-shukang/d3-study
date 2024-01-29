class NumberUtil {
  public random(start: number, end: number) {
    return Math.floor(Math.random() * (end - start)) + start + 1;
  }
}

export const numberUtil = new NumberUtil();
