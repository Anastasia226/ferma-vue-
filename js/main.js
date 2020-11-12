new Vue({
  el: "#app",
  data: {
    title: "Правила игры",
    gameTime: 0,
    select_type: null,
    select_type_sale: null,
    allMoney: 150,
    types: [
      {
        type: 0,
        name: "Пусто",
        img: "img/cell.png",
        isDone: false,
      },
      {
        type: 1,
        name: "Пшеница",
        img: "img/wheat.png",
        imgDone: "img/millet.png",
        cost: 10,
        money: 1,
        time: 5,
        countTime: 0,
        isStart: false,
        isDone: false,
        count: 0,
      },
      {
        type: 2,
        name: "Курица",
        img: "img/chicken.png",
        imgDone: "img/egg.png",
        cost: 15,
        money: 3,
        time: 10,
        countTime: 0,
        isStart: true,
        isDone: false,
        count: 0,
      },
      {
        type: 3,
        name: "Корова",
        img: "img/cow.png",
        imgDone: "img/milk.png",
        cost: 20,
        money: 5,
        time: 15,
        countTime: 0,
        isStart: true,
        isDone: false,
        count: 0,
      },
    ],
    objects: [],
  },
  created() {
    let a = this;
    //таймер
    setInterval(function () {
      for (let i = 0; i < 36; i++) {
        if (a.objects[i].type > 0) {
          if (!a.objects[i].isDone) {
            if (!a.objects[i].isStart) {
              if (a.objects[i].countTime < a.objects[i].time) {
                a.objects[i].countTime += 1;
              } else {
                a.objects[i].img = a.objects[i].imgDone;
                a.objects[i].isDone = true;
                a.gameTime += 1;
              }
            }
          }
        }
      }
    }, 1000);
    //создание поля
    for (let i = 0; i < 36; i++) {
      this.objects[i] = Object.assign({}, this.types[0]);
    }
  },
  methods: {
    selected(index) {
      if (this.select_type == index) {
        this.select_type = null;
      } else {
        this.select_type = index;
      }
    },
    buy(index) {
      //кормежка
      if (this.types[1].count >= 1 && this.objects[index].isStart) {
        this.objects[index].isStart = false;
        this.types[1].count -= 1;
      }
      //сбор готовых продуктов
      if (this.objects[index].type != 0 && this.objects[index].isDone) {
        this.objects[index].isDone = false;
        this.objects[index].img = this.types[this.objects[index].type].img;
        this.objects[index].countTime = 0;
        this.types[this.objects[index].type].count += 1;
        if (this.objects[index].type > 1) {
          this.objects[index].isStart = true;
        }
      }
      //покупка
      if (this.select_type != null && this.objects[index].type == 0) {
        if (this.allMoney >= this.types[this.select_type].cost) {
          this.allMoney -= this.types[this.select_type].cost;
          this.objects[index] = Object.assign({}, this.types[this.select_type]);
        } else {
          if (this.allMoney < this.types[this.select_type].cost)
            alert("Недстаточно денег!");
        }
      }
    },
    sell(index) {
      if (this.types[index].count > 0) {
        this.allMoney += this.types[index].money * this.types[index].count;
        this.types[index].count = 0;
      }
    },
    changeText() {
      this.title = `
           ●	Пшеница вырастает за 10 сек, после чего можно собрать урожай (1 единица урожая с одной клетки); затем рост начинается заново;<br>
    ●	Пшеницей можно покормить курицу и корову;<br>
    ●	Если еды достаточно, то курица несёт одно яйцо за 10 сек, а корова даёт молоко раз в 20 сек;<br>
    ●	1 единицы пшеницы хватает на 30 сек курице и на 20 сек корове; <br>
    ●	Яйца и молоко можно продать, получив прибыль.
          `;
    },
    changeText2() {
      this.title = "Правила игры";
    },
  },
});
