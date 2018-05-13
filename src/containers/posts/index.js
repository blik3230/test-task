import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Table } from 'react-materialize';
import moment from 'moment';

import {
    fetchPosts,
    selectPost,
    unselectPost,
    filter, updatePosts
} from "../../actions";

import Filter from '../../components/filter';

class Posts extends Component {

    componentDidMount() {
        this.props.fetchPosts();

        this.interval = setInterval(() => {
            this.props.updatePosts();
        }, 10000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    renderPost(post, index) {

        return (
            <tr
                key={index}
                onClick={() => {this.props.selectPost(JSON.stringify(post, null, 2))}}
            >
                <td>{index + 1}</td>
                <td style={{maxWidth: 300}}>{post.title}</td>
                <td>
                    {
                        post.url?
                            (<a
                                href={post.url}
                                style={{
                                    display: 'inline-block',
                                    maxWidth: 200
                                }}
                                className="truncate"
                                title={post.url}
                                onClick={(e) => e.stopPropagation()}
                            >{post.url}</a>):
                            (<p>without url</p>)
                    }
                </td>
                <td>{moment(post.created_at).format('lll')}</td>
                <td>{post.author}</td>
            </tr>
        )
    }

    renderModal() {
        const {jsonStringForModal, unselectPost} = this.props;
        if(!jsonStringForModal) return null;

        const modalOptions = {
            complete: () => {
                unselectPost()
            }
        };

        return (
            <Modal
                modalOptions={modalOptions}
                open
                fixedFooter
                header={'Json of selected post'}
            >
                <pre>{jsonStringForModal}</pre>
            </Modal>
        )
    }

    render() {
        const {posts, filter} = this.props;

        return (
            <div className="container" style={{padding: '20px 0'}}>

                <Filter onFilter={filter}/>

                {
                    posts.length?
                        (<Table hoverable bordered responsive>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Url</th>
                                <th>Created at</th>
                                <th>Author</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                posts.map((post, index) => this.renderPost(post, index))
                            }
                            </tbody>
                        </Table>):
                        (<p>nothing to show</p>)
                }


                {
                    this.renderModal()
                }
            </div>
        );
    }
}

Posts.propTypes = {
    posts: PropTypes.array.isRequired,
    jsonStringForModal: PropTypes.string,
    fetchPosts: PropTypes.func.isRequired,
    updatePosts: PropTypes.func.isRequired,
    selectPost: PropTypes.func.isRequired,
    unselectPost: PropTypes.func.isRequired,
    filter: PropTypes.func.isRequired,
};

const getPostsWithFilter = (state) => {
    const {posts, filter} = state;
    return posts.filter((post) => post.title.toLowerCase().includes(filter.toLowerCase()));
};

const mapStateToProps = (state) => {
    return {
        posts: getPostsWithFilter(state),
        jsonStringForModal: state.selectedPost
    };
};

const mapDispatchToProps = {
    fetchPosts,
    updatePosts,
    selectPost,
    unselectPost,
    filter
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);