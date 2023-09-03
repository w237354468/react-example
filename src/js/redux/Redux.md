# Redux
关键思想：
1. 应用程序的所有数据都在一个名为state的数据结构中，状态保存在store中
2. 应用程序从store中读取state
3. state永远不会在store外直接改变
4. 视图会发出描述所发生事件的action
5. 将旧的state和action通过一个reducer进行组合来创建他们