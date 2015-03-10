require('src/ai.js');

var GameTime = 0;

var fieldCardNum = 0;
var fieldCardSum = 0;
var cardStockNum = 80;
var fieldCardLabel;
var cardStockLabel;
var fieldCardPositionX = 120;

var bg;
var frame = 0;
var cardStockImg;
var fieldCards = [];

var playerCard1;
var playerCard2;
var playerCard3;
var cpuCard1;
var cpuCard2;
var cpuCard3;



var Pig10Layer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;
        
        // 背景画像を表示させる
        bg = cc.Sprite(res.bg_png);
        bg.setAnchorPoint(0,0);
        bg.setPosition(0,0);
        bg.setScale(0.708,0.708);
        this.addChild(bg,1);
        
        // 場のカードのラベルを作る
        fieldCardNum = ai(10,20,30);
        fieldCardLabel = cc.LabelTTF("?", "Arial", 20) // 最後の20は文字の大きさ
        fieldCardLabel.setString("場の合計：" + fieldCardNum + "（"+fieldCardNum+" 枚）");
        fieldCardLabel.setPosition(200,300);
        this.addChild(fieldCardLabel,20);

        // ストックのカードのラベルを作る
        cardStockLabel = cc.LabelTTF("?", "Arial", 20) // 最後の20は文字の大きさ
        cardStockLabel.setString("残り" + cardStockNum + " 枚");
        cardStockLabel.setPosition(600,300);
        this.addChild(cardStockLabel,20);

        cardStockImg = cc.Sprite(res.card_back_png);
        cardStockImg.setPosition(600,210);
        cardStockImg.setScale(0.9,0.9);
        this.addChild(cardStockImg,10);
        
        // プレーヤーのカード
        this.setPlayerCard(5, 7, 2);
        
        //CPUのカードをセット
        this.setCpuCard(4, 6, 1);
        
        //プレーヤーのカードを場に移動
       	//this.movePlayerCard(playerCard2,8);
        this.callAfter(1, this.movePlayerCard.bind(this,playerCard1, 9));
        this.callAfter(3, this.movePlayerCard.bind(this,playerCard2, 8));
        this.callAfter(3, this.movePlayerCard.bind(this,playerCard3, 7));

        /*
        this.runAction(cc.Sequence.create( 
        		cc.DelayTime.create(3),
        		cc.CallFunc.create(function() { this.movePlayerCard(playerCard3,1); }, this) 
        )); 
        */
        
        
        

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
                this.onRestart();
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);
        

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label

        //var helloLabel = new cc.LabelTTF("Hello World!!!", "Arial", 38);

        // position the label on the center of the screen
        //helloLabel.x = size.width / 2;
        //helloLabel.y = 0;
        // add the label as a child to this layer
        //this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.Card_spades_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
            rotation: 180
        });
        this.addChild(this.sprite, 0);

        this.sprite.runAction(
            cc.sequence(
                cc.rotateTo(2, 0),
                cc.scaleTo(2, 1, 1)
            )
        );
        //helloLabel.runAction(
            //cc.spawn(
                //cc.moveBy(2.5, cc.p(0, size.height - 40)),
                //cc.tintTo(2.5,255,125,0)
            //)
        //);
        return true;
    },

    // CPUのカードをセットする
	setCpuCard:function(card1,card2,card3){
		card = [card1,card2,card3];
		card.sort();
		
        cpuCard1 = cc.Sprite(this.getCardImg(card[0]));
        cpuCard1.setPosition(490,385);
        cpuCard1.setScale(0.7,0.7);
        this.addChild(cpuCard1,10);

        cpuCard2 = cc.Sprite(this.getCardImg(card[1]));
        cpuCard2.setPosition(590,385);
        cpuCard2.setScale(0.7,0.7);
        this.addChild(cpuCard2,10);

        cpuCard3 = cc.Sprite(this.getCardImg(card[2]));
        cpuCard3.setPosition(690,385);
        cpuCard3.setScale(0.7,0.7);
        this.addChild(cpuCard3,10);
	},
	
	// プレイヤーのカードをセットする
	setPlayerCard:function(card1,card2,card3){
		card = [card1,card2,card3];
		//card.sort();

		playerCard1 = cc.Sprite(this.getCardImg(card[0]));
		playerCard1.setPosition(100,60);
		playerCard1.setScale(0.7,0.7);
		playerCard1.setTag(card[0]);
		this.addChild(playerCard1,10);

		playerCard2 = cc.Sprite(this.getCardImg(card[1]));
		playerCard2.setPosition(200,60);
		playerCard2.setScale(0.7,0.7);
		playerCard2.setTag(card[1]);
		this.addChild(playerCard2,10);

		playerCard3 = cc.Sprite(this.getCardImg(card[2]));
		playerCard3.setPosition(300,60);
		playerCard3.setScale(0.7,0.7);
		playerCard3.setTag(card[2]);
		this.addChild(playerCard3,10);
	},
	
	getCardImg:function(number){
		var cardImg;
		switch (number) {
			case 1:
				cardImg = res.card_png_1;
				break;
			case 2:
				cardImg = res.card_png_2;
				break;
			case 3:
				cardImg = res.card_png_3;
				break;
			case 4:
				cardImg = res.card_png_4;
				break;
			case 5:
				cardImg = res.card_png_5;
				break;
			case 6:
				cardImg = res.card_png_6;
				break;
			case 7:
				cardImg = res.card_png_7;
				break;
			case 8:
				cardImg = res.card_png_8;
				break;
			case 9:
				cardImg = res.card_png_9;
				break;
			case 10:
				cardImg = res.card_png_10;
				break;
			default:
				cardImg = res.card_png_1;
				break;
		}
        return cardImg;
	},
	
	movePlayerCard:function(card,num){
		var move = cc.moveTo(0.8, fieldCardPositionX, 210);
		fieldCardPositionX += 30;
		var scale = cc.ScaleTo(0.8, 0.9, 0.9); 
		var fieldCard = cc.Sprite(this.getCardImg(card.getTag()));
		var pos = card.getPosition();

		fieldCard.setPosition(pos);
		fieldCard.setScale(0.7,0.7);
		this.addChild(fieldCard,10);

        var spawn = cc.Spawn.create(move, scale);
        fieldCard.runAction(spawn);
		fieldCards.push(fieldCard);

        this.removeChild(card);
        card = cc.Sprite(res.card_back_png);
        card.setPosition(600,210);
        card.setScale(0.9,0.9);
		this.addChild(card,10);

		move = cc.moveTo(1, pos);
		scale = cc.ScaleTo(1, 0.7, 0.7); 
        spawn = cc.Spawn.create(move, scale);
        //var delay = cc.DelayTime.create(5);
       
        //カードを動かす
        card.runAction(cc.Sequence.create( 
				cc.DelayTime.create(1),
        		spawn,
        		cc.CallFunc.create(function(card) { 
        			this.flipCard(card, num);
        		}, this),
        		cc.CallFunc.create(function(card) { 
        			this.checkFieldCard(card, 1);
        		}, this)
        ));
		return true;
	},	
	
	checkFieldCard:function(card,owner){

	},
	
	flipCard:function(card,num){

		var initRotate = cc.RotateBy.create(0, 0, 90);
		var flipRotate = cc.RotateBy.create(0.2, 0, 90);

		var pos = card.getPosition();
		var dumyCard = cc.Sprite(res.card_back_png);
		dumyCard.setPosition(pos);
        dumyCard.setScale(0.7,0.7);
		this.addChild(dumyCard,10);

        this.removeChild(card);
		card = cc.Sprite(this.getCardImg(num));
		card.setPosition(pos);
        card.setScale(0.7,0.7);
        card.setRotationY(180);
		this.addChild(card,10);
		
		card.runAction(cc.Sequence.create(initRotate));
		var targetAction = cc.TargetedAction.create(card, flipRotate);
		dumyCard.runAction(cc.Sequence.create(flipRotate, targetAction));
	},
	
	callAfter:function(delay,func){
        cc.log(GameTime);
		GameTime += delay;
        cc.log(GameTime);
		this.runAction(cc.Sequence.create( 
				cc.DelayTime.create(GameTime),
				cc.CallFunc.create(function() { 
					func();
				}, this) 
		)); 	
	},
	
	onRestart:function(){
		// グローバル変数を初期化する
		GameTime = 0;

		// もう一度、シーン（GameScene）を読み込んでゲームスタート
		cc.director.replaceScene(new Pig10());
	}
});

var Pig10 = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Pig10Layer();
        this.addChild(layer);
    }
});

