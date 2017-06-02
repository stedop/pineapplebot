#Pineapple Bot

 This is an attempt at a modular bot framework which can link multiple API's and provide them as a service to
 command modules which are run based on websocket events or timers (depending on use and application).

 I am basing this off the MVC architecture but unlike for web apps I think MVC works well for a node bot due to the
 stateful nature of a javascript app.

 Included are some commands for the UKTrees (unofficial) server.

 - **Help** - give the help for a command, leave blank to list all commands.
 - **Ping** - responds pong, useful for checking if bot is alive.
 - **Top** - lists the top n posts in r/uktrees, maximum of 10.
 - **Where** - will tell you if this user is registered on the map and tell you their location.

 ##Roadmap for the future.

 1. The service provider needs to be properly realised, it works at the moment but improvments can be made
 2. More commands can be written I'd really like to build it so the commands can be "dropped in".
 3. I think the router could be sped up also
 
 ##Contributing
 
 If you're crazy enough to want to add code then by all means, create a fork and send some PR's.
 Add issues to the bug tracker and send me some new features.
  
 ##Thanks
 Whatup uktrees :D
 
 https://github.com/chalda/DiscordBot - My router essentially started by copying the code from this project.
 So obviously they need a big thanks and acknowledgment.
 
 