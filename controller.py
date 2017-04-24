from web import ctx


def add_book(name, author, press) -> {
    '成功': {'code': 0, 'id': 42,}
}:
    """新增图书
    :param name: 书名
    :param author: 作者
    :param press: 出版社
    :return id: 新增的书的ID
    """
    pass


def update_book(id:int, name=None, author=None, press=None) -> {
    '成功': {'code': 0},
    '未找到ID': {'code': 1, 'message': '该书已被删除',}
}:
    """
    修改图书信息
    :param id: 图书ID
    :param name: 书名
    :param author: 作者
    :param press: 出版社
    :return: message: 错误信息
    """
    pass


def detail_book(id:int) -> {
    '成功': {
        'code': 0,
        'detail': {
            'name': '深入理解计算机系统',
            'author': "[美国] Randal E·Bryant / David O'Hallaron",
            'press': '中国电力出版社',
            'create_at': '2017-04-07 12:01:02',
        }
    },
    '未找到ID': {'code': 1, 'message': '该书已被删除',}
}:
    """
    查询图书详情
    :param id: 图书ID
    :return: detail: 图书详情
    :return: name: 书名
    :return: author: 作者
    :return: press: 出版社
    :return: create_at: 创建时间
    """
    pass


def list_book() -> {
    '成功': {
        'code': 0,
        'list': [
            {
                'id': 42,
                'name': '深入理解计算机系统',
                'author': "[美国] Randal E·Bryant / David O'Hallaron",
                'press': '中国电力出版社',
            },
            {
                'id': 43,
                'name': '编程珠玑',
                'author': "Jon Bentley",
                'press': '人民邮电出版社',
            },
        ]
    }
}:
    """
    查询图书列表
    :return: list: 图书列表
    :return: id: 图书ID
    :return: name: 书名
    :return: author: 作者
    :return: press: 出版社
    """
    pass


def delete_book(id:int) -> {
    '成功': {'code': 0}
}:
    """
    删除图书
    :param id: 图书ID
    """
    pass
