import {manualDateSelector} from './dateHandler';

test('Returns an array with one Date object from one given date point', () => {
    const singleDatePoint = new Date(2021, 6, 12); // Mon 12/Jul/2021
    const expectedArray = [singleDatePoint];

    expect(manualDateSelector(singleDatePoint, null)).toEqual(expectedArray);
});

test('Returns an array of Date objects between two given date points', () => {
    const firstDatePoint = new Date(2021, 6, 12); //FROM: Mon 12/Jul/2021
    const secondDatePoint = new Date(2021, 6, 16); //TO: Fri 16/Jul/2021
    const expectedArray = [firstDatePoint, new Date(2021, 6, 13), new Date(2021, 6, 14), new Date(2021, 6, 15), secondDatePoint];

    expect(manualDateSelector(firstDatePoint, secondDatePoint)).toEqual(expectedArray);
});

test('Returns an array of Date objects between two given date points skipping weekends', () => {
    const firstDatePoint = new Date(2021, 6, 12); //FROM: Mon 12/Jul/2021
    const secondDatePoint = new Date(2021, 6, 19); //TO: Mon 19/Jul/2021
    const expectedArray = [firstDatePoint, new Date(2021, 6, 13), new Date(2021, 6, 14), new Date(2021, 6, 15), new Date(2021, 6, 16), secondDatePoint];

    expect(manualDateSelector(firstDatePoint, secondDatePoint)).toEqual(expectedArray);
});

test('Returns null because single given date point is weekend', () => {
    const firstDatePoint = new Date(2021, 6, 17); //Sat 17/Jul/2021
    const expectedValue = null;

    expect(manualDateSelector(firstDatePoint, null)).toEqual(expectedValue);
});

test('Returns null because one of the two given date point is weekend', () => {
    const firstDatePoint = new Date(2021, 6, 12); //FROM Mon 12/Jul/2021
    const secondDatePoint = new Date(2021, 6, 17); //TO Sat 17/Jul/2021
    const expectedValue = null;

    expect(manualDateSelector(firstDatePoint, secondDatePoint)).toEqual(expectedValue);
});