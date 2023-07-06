export class BankAccount{
    constructor(){
      this.accountStatus = false;
    }
    open(){
      if(this.accountStatus == false){
        this.accountStatus = true; this.accountBalance = 0;
      }else{
        throw new ValueError("This account is opened.");
      }
    }
    close(){
      if(this.accountStatus == true){
        this.accountStatus = false; this.accountBalance = null;
      }else{
        throw new ValueError("This account is closed.");
      }
    }
    deposit(value){
      if(this.accountStatus == true){
        if(value >= 0){
          this.accountBalance += value;
        }else{
          throw new ValueError("Deposit money cannot be negative.");
        }
      }else{
        throw new ValueError("This account is closed.");
      }
    }
    withdraw(value){
      if(this.accountStatus == true){
        if(value >= 0){
          if((this.accountBalance - value) >= 0){
            this.accountBalance -= value;
          }else{
            throw new ValueError("Not enaugh money.");
          }
        }else{
          throw new ValueError("Withdraw money cannot be negative.");
        }
      }else{
        throw new ValueError("This account is closed.");
      }
    }
    get balance(){
      if(this.accountStatus == true){
        return this.accountBalance;
      }else{
        throw new ValueError("This account is closed.");
      }
    }
  }
  export class ValueError extends Error{
    constructor(){
      super('Bank account error');
    }
  }