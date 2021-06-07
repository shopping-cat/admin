const dict = {
    'dashboard': {
        name: '대시보드'
    },
    'shop': {
        name: '상점관리',
        default: {
            name: '상점세부'
        },
        'new': { name: '신규가입' }
    },
    'item': {
        name: '상품관리',
        default: {
            name: '상품세부'
        },
        'new': { name: '신규상품' },
        'update': { name: '업데이트 요청상품' }
    },
    'order': {
        name: '주문관리',
        default: {
            name: '주문세부'
        }
    },
    'app': {
        name: '앱관리',
        'version': { name: '버전관리' }
    }
}

const pathToKorean = (path: string) => {
    if (path === '/') return []
    const result: { name: string, path: string }[] = []
    const splitedPath = path.slice(1).split('/')
    let myDict = dict
    for (let i = 0; i < splitedPath.length; i++) {
        if (Object.keys(myDict).includes(splitedPath[i])) {
            myDict = myDict[splitedPath[i]]
        } else {
            myDict = myDict['default']
        }

        let name = ''
        try {
            name = myDict['name']
        } catch (error) {
            name = '오류'
        }
        // console.log(splitedPath.slice(0, i + 1).join('/'))
        result.push({
            name: name,
            path: '/' + splitedPath.slice(0, i + 1).join('/')
        })
    }
    return result
}

export default pathToKorean