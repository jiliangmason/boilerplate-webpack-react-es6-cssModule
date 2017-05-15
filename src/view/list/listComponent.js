import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MyList from 'MyList'
import ListErr from 'ListErr'
import TabSwitch from 'TabSwitch'
import style from './list.less'

class ListComponent extends Component {
	constructor(props) {
        super(props)
    }
	componentDidMount() {
		this.props.handleGetData('movie', 1)
	}
	handleTabChange(now) {
		const bookData = this.props.bookListInfo.data
		now == 1 && bookData.length == 0 && this.props.handleGetData('book', 1)
	}
	renderList(data) {
		return data && data.length > 0 ? <MyList data={data} /> : <ListErr />
	}
	renderPanelContent(type, info) {
		const { handleGetData } = this.props
		const { data, total, now } = info
		return (
			<div className={style.panel}>
				{this.renderList(data)}
				<div className={style.panel_bottom}>
					<div>{now}/{total} 页</div>
					<div onClick={()=>handleGetData(type, now + 1)}>查看更多</div>
				</div>
			</div>
		)
	}
	renderSwitch() {
		const { movieListInfo, bookListInfo } = this.props
		const moviePanel = {title:'电影', content: this.renderPanelContent('movie', movieListInfo)}
		const bookPanel = {title:'图书', content: this.renderPanelContent('book', bookListInfo)}
		const panels = [moviePanel, bookPanel]
		
		return(
			<TabSwitch 
				panels={panels}
				activeIndex={0}
				onTabChange={(prev, now)=> this.handleTabChange(now)}
			/>
		)
	}
	render() {
		const { handleGoBack } = this.props
		return (
			<div className={style.wrap}>
				{this.renderSwitch()}
				<div onClick={()=>handleGoBack()}>返回首页</div>
			</div>
		)
	}
}

ListComponent.propTypes = {
	movieListInfo: PropTypes.object,
	bookListInfo: PropTypes.object,
	handleGetData: PropTypes.func,
	handleTabChange: PropTypes.func,
	handleGoBack: PropTypes.func
}

export default ListComponent