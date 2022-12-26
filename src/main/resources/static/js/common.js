let login = (event) => {
	event.preventDefault();
	let jsonString = {
		'userName': $('input[name=userName]').val(),
		'password': $('input[name=password]').val()
	};
	$.ajax({
		type: 'POST',url: '/ecsite/api/login',
		data: JSON.stringify(jsonString),
		contentType: 'application/json',
		datatype: 'json',
		scriptCharset: 'UTF-8'
	})
	.then((result) => {
		let user = JSON.parse(result);
		$('#welcome').text(` -- ようこそ！ ${user.fullName}さん`);
		$('#hiddenUserId').val(user.id);
		$('input[name=userName]').val('');
		$('input[name=password]').val('');
	}, () => {
		console.error('Error: ajax connection failed.');
	}
	);
};

let addCart = (event) => {
	console.log("カートに入れる処理実行");
	let tdList = $(event.target).parent().parent().find('td');
	
	let id = $(tdList[0]).text();
	let goodsName = $(tdList[1]).text();
	let price = $(tdList[2]).text();
	let count = $(tdList[3]).find('input').val();
	console.log("注文数:" + count);
	
	if (count === '0' || count === '') {
		alert('注文数が0または空欄です。');
		return;
	}
	
	let cart = {
		'id': id,
		'goodsName': goodsName,
		'price': price,
		'count': count
	};
	cartList.push(cart);
	
	
	let tbody = $('#cart').find('tbody');
	$(tbody).children().remove();
	cartList.forEach(function(cart) {
		let tr = $('<tr />');
		console.log("forEach内部")
		
		$('<td />', { 'text': cart.id}).appendTo(tr);
		$('<td />', { 'text': cart.goodsName}).appendTo(tr);
		$('<td />', { 'text': cart.price}).appendTo(tr);
		$('<td />', { 'text': cart.count}).appendTo(tr);
		let tdButton = $('<td />');
		$('<button />', {
			'text': 'カート削除',
			'class':'removeBtn',
		}).appendTo(tdButton);
		
		$(tdButton).appendTo(tr);
		$(tr).appendTo(tbody);
	});
		$('.removeBtn').on('click', removeCart);
};


let buy = () => {
	$.ajax({
		type: 'POST',
		url: '/ecsite/api/purchase',
		data: JSON.stringify({
			"userId": $('#hiddenUserId').val(),
			"cartList": cartList
		}),
		contentType: 'application/json',
		datatype: 'json',
		scriptCharset: 'utf-8'
	})
	.then(() => {
		alert('購入しました。');
	}, () => {
		console.error('Error: ajax connection failed.');
	}
	);
};


let removeCart = (event) => {
	const tdList = $(event.target).parent().parent().find('td');
	let id = $(tdList[0]).text();
	cartList = cartList.filter(function(cart) {
		return cart.id !== id;
	});
	$(event.target).parent().parent().remove();
};


let showHistory = () => {
	$.ajax({
		type: 'POST',
		url: '/ecsite/api/history',
		data: JSON.stringify({ "userId": $('#hiddenUserId').val() }),
		contentType: 'application/json',
		datatype: 'json',
		scriptCharset: 'utf-8'
	})
	.then((result) => {
		let historyList = JSON.parse(result);
		let tbody = $('#historyTable').find('tbody');
		$(tbody).children().remove();
		historyList.forEach((history) => {
			let tr = $('<tr />');
			
			$('<td />', { 'text': history.goodsName }).appendTo(tr);
			$('<td />', { 'text': history.itemCount }).appendTo(tr);
			$('<td />', { 'text': history.createdAt }).appendTo(tr);
			
			$(tr).appendTo(tbody);
		});
		$("#history").dialog("open");
	}, () => {
		console.error('Error: ajax connection failed.');
			}
	);
};