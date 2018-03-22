package com.niit.dao;

import java.util.List; 


import javax.transaction.Transactional;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.niit.model.BlogPost;
import com.niit.model.Notification;
@Repository
@Transactional
public class BlogPostDaoImpl implements BlogPostDao {
	@Autowired
private SessionFactory sessionFactory;
	public void addBlogPost(BlogPost blogPost) {
		Session session=sessionFactory.getCurrentSession();
		session.save(blogPost);
	}
	public List<BlogPost> getBlogs(boolean approved) {//true or false
		Session session=sessionFactory.getCurrentSession();
		Query query=session.createQuery("from BlogPost where approved=?");
		query.setBoolean(0, approved);
		return query.list();
		//select * from blogpost_s180233 where approved=1
		//or
		//select * from blogpost_s180233 where approved=0
	}
	public BlogPost getBlogById(int id) {
		Session session = sessionFactory.getCurrentSession();
		BlogPost blogPost = (BlogPost) session.get(BlogPost.class, id);
		return blogPost;
	}
	public void blogApproved(int id) {
		Session session = sessionFactory.getCurrentSession();
		BlogPost blogPost = (BlogPost) session.get(BlogPost.class, id);
		//BlogPost approved
		//Two queries
		//1. update approval column for the blogpost to true
		//2. insert a new record in notification
		blogPost.setApproved(true);
		session.update(blogPost); //update blogpost set approved=true where id=?
		Notification notification=new Notification();
		notification.setBlogTitle(blogPost.getBlogTitle());
		notification.setEmail(blogPost.getPostedBy().getEmail());
		notification.setApprovalStatus("Approved");
		session.save(notification);
		//In notification view, your blogpost title "notification.blogTitle" is "notification.approvalStatus"
		//in view your blogpost titled "Sample Post" is approved
		
	}

	public void blogRejected(int id, String rejectionReason) {
		Session session = sessionFactory.getCurrentSession();
		BlogPost blogPost = (BlogPost) session.get(BlogPost.class, id);
		//BlogPost approved
		//Two queries
		//1. delete from blogpost where id=?
		//2. insert into notification (?,blogtitle,email,rejectionreason.approvalStatus)
	
		Notification notification=new Notification();
		notification.setBlogTitle(blogPost.getBlogTitle());
		notification.setEmail(blogPost.getPostedBy().getEmail());
		notification.setApprovalStatus("Rejected");
		notification.setRejectionReason("rejectionReason");
		session.save(notification);
		session.delete(blogPost);
		//In notification view, your blogpost title "notification.blogTitle" is "notification.approvalStatus"
		//in view your blogpost titled "Sample Post" is approved
		
	}
}
