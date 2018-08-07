(function () {
    'use strict';

    require('../proto/lobby_pb.js');

    module.exports = Lobby;

    function Lobby(user) {
        this.user = user;
    }

    var proto1 = Lobby.prototype;

    proto1.Login = function () {
        this.queryPlayerBaseInfo();
    };

    proto1.queryPlayerBaseInfo = function () {
        var msg = new proto.proto.MsgPlayerBaseInfo();
        this.user.gateway.ForwardMsg(proto.proto.MsgTypeCmd_Lobby.PLAYERBASEINFO, msg);
    };


    proto1.OnRecvMsg = function (cmd, data) {
        switch (cmd) {
            case proto.proto.MsgTypeCmd_Lobby.PLAYERBASEINFO:
                var msg = proto.proto.MsgPlayerBaseInfoResult.deserializeBinary(data);
                console.log(msg);
                break;
        }
    };

})();