import { BankAccount, ValueError } from './bank-account';

describe('Bank Account', () => {
  const myPiggy = new BankAccount();
  test('newly opened account has zero balance', () => {
    myPiggy.open();
    expect(myPiggy.balance).toEqual(0);
  });

  test('can deposit money', () => {
    myPiggy.deposit(20);
    expect(myPiggy.balance).toBe(20);
  });

  test('can deposit money sequentially', () => {
    for(let i=0; i<7; i++){
      myPiggy.deposit(Math.pow(131, i));
    }
    expect(myPiggy.balance).toBe(5092789399257)
  });

  test('can withdraw money', () => {
    myPiggy.withdraw(10000)
    expect(myPiggy.balance).toBe(5092789389257);
  });

  test('can withdraw money sequentially', () => {
    for(let i=0; i< 7; i++){
      myPiggy.withdraw(1932120);
    }
    expect(myPiggy.balance).toBe(5092775864417);
  });

  test('checking balance of closed account throws error', () => {
    myPiggy.close();
    expect( () => myPiggy.balance).toThrow(Error);
  });

  test('deposit into closed account throws error', () => {
    expect( () => myPiggy.deposit(10) ).toThrow(Error)
  });

  test('withdraw from closed account throws error', () => {
    expect( () => myPiggy.deposit(1000000) ).toThrow(Error)
  });

  test('close already closed account throws error', () => {
    expect( () => myPiggy.close() ).toThrow(Error)
  });

  test('open already opened account throws error', () => {
    myPiggy.open();
    expect( () => myPiggy.open() ).toThrow(Error)
  });

  test('reopened account does not retain balance', () => {
    expect( myPiggy.balance ).toBe(0)
  });

  test('cannot withdraw more than deposited', () => {
    myPiggy.deposit(100)
    expect( () => myPiggy.withdraw(1000)).toThrow(Error)
  });

  test('cannot withdraw negative amount', () => {
    expect( () => myPiggy.withdraw(-10)).toThrow(Error)
  });

  test('cannot deposit negative amount', () => {
    expect( () => myPiggy.deposit(-10)).toThrow(Error)
  });

  test('changing balance directly throws error', () => {
    expect( () => myPiggy.balance(-10)).toThrow(Error)
  });
});