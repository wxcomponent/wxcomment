/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/
interface PolyfillPromise<T> {
    finally(callback?: () => T): Promise<T>;
}
interface Promise<T> extends PolyfillPromise<T> {
}
