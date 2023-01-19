

    $('#search_btn').click(search);

    function search() {
        var searchKey = $('#search-input').val();
        if (searchKey == '' || searchKey == undefined) {
            $('.search-output').html('<p style="font-size:16px;color: black;">请输入查询内容</p>');
            return;
        }
        $('.search-output').html('<p style="font-size:16px;color: #dc8334;">查询中...</p>');
        $.ajax({
            url: "/search/",
            data: {'searchKey': searchKey},
            type: "POST",
            dataType: "json",
            async: false,
            success: function(data) {
                var characters = data.msg;

                if (data.result == 1) {
                    // loader.style.display = 'none';
                    $('.search-output').html('<p style="font-size:16px;color: black;">' + data.msg + '</p>');
                    return;
                }
                if (characters.length == 0 ){
                    // loader.style.display = 'none';
                    $('.search-output').html( '<p style="font-size:16px;color: black;">未发现数据</p>');
                }else{
                    //Display characters
                    displayCharacters(characters);
                }
            },
            error: function(){
                // loader.style.display = 'none';
                $('.search-output').innerHTML = '<p class="no-results">系统异常</p>';
            }
                
        });


        
    }

    function displayCharacters(characters) {

        var output = '';
        characters.forEach(function (character) {

            //Add character to output string
            // output += '<details class="character-details">\n\n                <summary class="character-summary">' + character.name + '</summary> \n\n                <div class="character-container">\n\n                    <div class="character-info">\n\n                        <details class="character-info-item" open>\n                            <summary class="character-info-item-summary">Name</summary>\n                            <p class="character-info-item-data">' + character.name + '</p>\n                        </details>\n\n                        <details class="character-info-item" open>\n                            <summary class="character-info-item-summary">Species</summary>\n                            <p class="character-info-item-data">' + character.species + '</p>\n                        </details>\n\n                        <details class="character-info-item" open>\n                            <summary class="character-info-item-summary">Gender</summary>\n                            <p class="character-info-item-data">' + character.gender + '</p>\n                        </details>\n\n                        <details class="character-info-item" open>\n                            <summary class="character-info-item-summary">Location</summary>\n                            <p class="character-info-item-data">' + character.location.name + '</p>\n                        </details>\n\n                    </div>\n\n                    <div class="character-image-container">\n\n                        <img class="character-image" src="' + character.image + '" alt="' + character.name + '">\n\n                    </div>\n\n                </div>\n\n            </details>';
                        output += '<details class="character-details">\n\n                <summary class="character-summary">' + character.name + '</summary> \n\n                <div class="character-container">\n\n                    <div class="character-info">\n\n                        <details class="character-info-item" open>\n                            <summary class="character-info-item-summary">名称</summary>\n                            <p class="character-info-item-data">' +  character.name + '</p>\n                        </details>\n\n                        <details class="character-info-item" open>\n                            <summary class="character-info-item-summary">类型</summary>\n                            <p class="character-info-item-data">' + (character.type == 'hgnd'? '年度' : (character.type == 'hgjd' ? '季度' : '月度')) + ' ' + character.unit + '</p>\n                        </details>\n\n                        <details class="character-info-item" open>\n                            <summary class="character-info-item-summary">时间</summary>\n                            <p class="character-info-item-data">' + character.x + '</p>\n                        </details>\n\n                        <details class="character-info-item" open>\n                            <summary class="character-info-item-summary">数值</summary>\n                            <p class="character-info-item-data">' + character.y + '</p>\n                        </details>\n\n                    </div>\n\n                    <div class="character-image-container">\n\n                        <a href="https://www.datamake.cn/data/' + character.id + '" style="color:white;font-weight: bold" target="_blank"><img class="character-image" src="https://www.datamake.cn/img/example.png" alt="' + character.name + '"></a>\n\n                    </div>\n\n                </div>\n\n            </details>';

        });
        $('.search-output').html( output);
    }

    