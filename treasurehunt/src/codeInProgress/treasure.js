//Function to pick up treasure if found
//Only notice items when using wise explorer?
//As we travel if items has length make call to pick up treasure
//check if you can carry it
//travel to store otherwise

pickUpTreasure = async() =>{
    const res = await axios({
        method: 'post',
        url: 'https://lambda-treasure-hunt.herokuapp.com/api/adv/take/',
        headers: {
          Authorization: //token from env
        },
        data: {
          treasure
        }
      });
    console.log(res.data)//see what this does and go from there

    }



while(encumbrance<strength){
    if(response.items.length){
        pickUpTreasure()
    }
}