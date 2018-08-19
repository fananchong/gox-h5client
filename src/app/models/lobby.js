(function () {
    'use strict';

    require('../proto/lobby_pb.js');
    var PageLobby = require('../pages/lobby.controller.js');

    module.exports = Lobby;

    function Lobby(user) {
        this.user = user;
    }

    var proto1 = Lobby.prototype;

    proto1.Login = function () {
        this.createPlayer();
    };

    proto1.createPlayer = function () {
        var msg = new proto.proto.MsgCreatePlayer();
        msg.setName(this.user.account + "_aa"); // role name
        msg.setSex(1);
        this.user.gateway.ForwardMsg(proto.proto.MsgTypeCmd_Lobby.CREATEPLAYER, msg);
    };

    proto1.queryPlayerBaseInfo = function () {
        var msg = new proto.proto.MsgPlayerBaseInfo();
        this.user.gateway.ForwardMsg(proto.proto.MsgTypeCmd_Lobby.PLAYERBASEINFO, msg);
    };


    proto1.OnRecvMsg = function (cmd, data) {
        var msg = null;
        switch (cmd) {
            case proto.proto.MsgTypeCmd_Lobby.CREATEPLAYER:
                msg = proto.proto.MsgCreatePlayerResult.deserializeBinary(data);
                if (msg.getErr() == 0 || msg.getErr() == proto.proto.EnumCreatePlayer.Error.ERREXIST) {
                    this.queryPlayerBaseInfo();
                }
                console.log("create player. code:", msg.getErr());
                break;
            case proto.proto.MsgTypeCmd_Lobby.PLAYERBASEINFO:
                msg = proto.proto.MsgPlayerBaseInfoResult.deserializeBinary(data);
                console.log("query role. code:", msg.getErr());
                console.log("query role. name:", msg.getName());
                this.user.playerName = msg.getName();
                PageLobby.scope.txtname = msg.getName();
                PageLobby.scope.txttips = "请点击'开始游戏'按钮~！";
                PageLobby.scope.$apply();
                break;
        }
    };

})();