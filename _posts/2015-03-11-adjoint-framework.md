---
layout: post
title: Adjoint Framework
disqus: y
---

In the previous post on ``adjoint``, we addressed that

$$\frac{\partial J}{\partial \alpha}^{\ast} = -u^{\ast}\frac{\partial P}{\partial \alpha} \underline{P^{-\ast} \frac{\partial J}{\partial u}^{\ast}}$$

involves three sub-problems, two of them are simply solving equations, the other is about matrix multiplications.

In this post, I plan to try to implement the framework of the ``adjoint`` method.

``` cpp
template <typename T>
class Adjoint {
private:
  bool is_m_updated;
  bool is_u_updated;
  bool is_lambda_updated;
public:
  Adjoint();
  ~Adjoint();
  // objective function of interest
  T J;
  // explicit derivative of J regards to u
  vector<T> dJdu;
  // explicit derivative of J regards to m
  vector<T> dJdm;
  // solution of forward problem
  vector<T> u;
  // parameter
  vector<T> m;
  // adjoint solution
  vector<T> lambda;
  // output as LHS
  vector<T> gradient;
  /*
   * methods
   */
  void set_m(T*);
  void update_dJdu();
  void update_dJdm();
  void update_J();
  T* get_m();
  T* get_u();
  T  get_J();
  T* get_grad();
  // calculate u, if is_m_updated == true, then calculate u
  // otherwise, u won't change. after calculating, set is_m_updated
  // as false. And set is_u_updated as true.
  void forward_solve();
  // calculate lambda, if is_u_updated == true, then calculate lambda
  // otherwise, lambda won't change, after calculating, set is_u_updated
  // as false. And set is_lambda_updated as true.
  void adjoint_solve();
  // calculate the final step, taken as a binary operator.
  // if is_lambda_updated == true, then use the binary operator on
  // u and lambda to generate the gradient.
  // meanwhile, set is_lambda_updated as false.
  void binary_op();
}
```
The ``adjoint`` class is easy to implement if the forward solver and adjoint solver are obtained outside the class. One possibility is to implement the solver as Matlab script/function and called by the member method, though there is some overhead, if the computing takes time, the overhead can be negligible. Another possibility is to implement in C++ as friend function. The best way might be implementing it in pure Matlab OOP using handle. Since most of the operations are trivial, and overheads can be reduced if called within Matlab.
