const problems = [
    {
        id: 1,
        title: "1.	在房間內四處尋找逃脫線索的你（妳），發現了黃金葛、波斯頓腎蕨兩株植物離土散落在地上，周邊一看，只剩下足夠可以種下一株植物的土，已知植物會行光合作用代謝二氧化碳，到底哪一種植物對於二氧化碳的消耗率較高呢？",
        options: [
            {
                percentage: -0.0012,
                text: "黃金葛",
                image: 0,
            },
            {
                percentage: -0.004,
                text: "波斯頓腎蕨",
                image: 1,
            },
        ],
    },
    {
        id: 2,
        title: "2.	種完植物後，為室內帶來些許氧氣來源，也讓你（妳）稍稍安心一點，但空間中的二氧化碳濃度還在持續上升中，待在密室中又悶又熱，讓人口乾舌燥，空間內只有兩罐600ml的碳酸飲料跟運動飲料，此時該選擇哪種飲料來解渴呢？",
        options: [
            {
                percentage: 0.15,
                text: "碳酸飲料",
                image: 2,
            },
            {
                percentage: 0,
                text: "運動飲料",
                image: 3,
            },
        ],
    },
    {
        id: 3,
        title: "3.	當你（妳）正在想辦法脫困時，突然聞到煙味，回頭一看，發現老舊的電線走火了！而燃燒會急遽加速二氧化碳的產生，這時候你（妳）要拿起旁邊的乾粉滅火器滅火，還是將一旁乾掉水族箱中的底沙倒上去撲滅火呢呢？",
        options: [
            {
                percentage: 10,
                text: "乾粉滅火器",
                image: 4,
            },
            {
                percentage: 0,
                text: "底沙",
                image: 5,
            },
        ],
    },
    {
        id: 4,
        title: "4.	在一番辛苦過後，好不容易滅了火，此時你（妳）發現自己實在餓到不行⋯⋯，房間裡只有洋芋片、密封罐包裝的果乾，為了不額外增加空間裡的二氧化碳，要吃哪種食物比較好呢？",
        options: [
            {
                percentage: 0,
                text: "洋芋片",
                image: 6,
            },
            {
                percentage: 0.22,
                text: "密封罐包裝的果乾",
                image: 7,
            },
        ],
    },
    {
        id: 5,
        title: "5.	終於你（妳）突然發現一把老舊長滿水垢的鑰匙，似乎跟唯一一扇門的鎖是一組的，去試了試卻因為太多水垢無法順利插入鑰匙，而空間中有醋跟小蘇打粉，還有活氧酵素清潔產品，也有清水垢的科技海綿，最後的關鍵時刻了，要使用哪一種除水垢方式才不會讓二氧化碳濃度衝破臨界點，又可以順利逃脫呢？",
        options: [
            {
                percentage: 10,
                text: "醋跟小蘇打粉",
                image: 8,
            },
            {
                percentage: 10,
                text: "活氧酵素清潔產品",
                image: 9,
            },
            {
                percentage: 0,
                text: "科技海綿",
                image: 10,
            },
        ],
    },
]
export default problems